import httpx

from app.config import settings


class TelegramService:
    def __init__(self) -> None:
        self.token = settings.telegram_bot_token

    @property
    def api_url(self) -> str:
        return f"https://api.telegram.org/bot{self.token}"

    async def send_start_menu(self, chat_id: int) -> None:
        if not self.token:
            return

        payload = {
            "chat_id": chat_id,
            "text": (
                "Привет! Это техническая версия mini app для торговли на Bitget.\n"
                "Сделки открываются по сигналам TradingView, а модуль ручного управления"
                " пока оставлен пустым."
            ),
            "reply_markup": {
                "inline_keyboard": [[{"text": "Открыть mini app", "web_app": {"url": settings.telegram_miniapp_url}}]]
            },
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            await client.post(f"{self.api_url}/sendMessage", json=payload)


telegram_service = TelegramService()
