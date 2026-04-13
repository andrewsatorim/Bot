from typing import Literal, Optional

from pydantic import BaseModel, Field


class TradingViewAlert(BaseModel):
    passphrase: str = Field(..., description="Secret passphrase configured in TradingView alert")
    symbol: str = Field(..., description="Bitget symbol, for example BTCUSDT")
    product_type: Literal["USDT-FUTURES", "COIN-FUTURES", "USDC-FUTURES"] = "USDT-FUTURES"
    margin_coin: str = Field(default="USDT", description="Margin coin, for example USDT")
    margin_mode: Literal["crossed", "isolated"] = "crossed"
    side: Literal["buy", "sell"]
    order_type: Literal["market", "limit"] = "market"
    size: str = Field(..., description="Order size in Bitget format")
    price: Optional[str] = Field(default=None, description="Required for limit order")


class CreateOrderResult(BaseModel):
    exchange_order_id: str
    status: str
    raw_response: dict


class TelegramUpdate(BaseModel):
    update_id: int
    message: Optional[dict] = None
    callback_query: Optional[dict] = None
