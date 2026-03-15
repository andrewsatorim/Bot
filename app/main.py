from pathlib import Path

from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import HTMLResponse

from app.config import settings
from app.models import TelegramUpdate, TradingViewAlert
from app.telegram_service import telegram_service
from app.trade_service import trade_service

app = FastAPI(title=settings.app_name)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "app": settings.app_name}


@app.get("/health/config")
async def health_config() -> dict:
    return {
        "bitget_ready": settings.bitget_ready(),
        "telegram_ready": settings.telegram_ready(),
        "miniapp_url_configured": bool(settings.telegram_miniapp_url),
        "tradingview_passphrase_configured": bool(settings.tradingview_passphrase),
    }


@app.post("/webhook/tradingview")
async def tradingview_webhook(alert: TradingViewAlert) -> dict:
    if settings.tradingview_passphrase and alert.passphrase != settings.tradingview_passphrase:
        raise HTTPException(status_code=401, detail="Invalid passphrase")

    if not settings.bitget_ready():
        raise HTTPException(status_code=503, detail="Bitget API credentials are not configured")

    result = await trade_service.open_from_tradingview_alert(alert)
    return {"status": "accepted", "order": result.model_dump()}


@app.post("/webhook/telegram")
async def telegram_webhook(
    update: TelegramUpdate,
    x_telegram_bot_api_secret_token: str | None = Header(default=None),
) -> dict:
    if settings.telegram_webhook_secret:
        if x_telegram_bot_api_secret_token != settings.telegram_webhook_secret:
            raise HTTPException(status_code=401, detail="Invalid Telegram secret token")

    message = update.message or {}
    text = message.get("text", "")
    chat = message.get("chat", {})

    if text.startswith("/start") and chat.get("id"):
        await telegram_service.send_start_menu(chat["id"])

    return {"status": "ok"}


MINIAPP_HTML_PATH = Path(__file__).resolve().parent / "static" / "miniapp.html"


@app.get("/miniapp", response_class=HTMLResponse)
async def miniapp_page() -> str:
    return MINIAPP_HTML_PATH.read_text(encoding="utf-8")


@app.get("/trade/control")
async def trade_control_placeholder() -> dict:
    """Future manual control endpoint. Intentionally left empty for next iteration."""
    raise HTTPException(status_code=501, detail="Trade control module is not implemented yet")
