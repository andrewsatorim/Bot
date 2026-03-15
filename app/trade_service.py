from app.bitget_client import bitget_client
from app.models import CreateOrderResult, TradingViewAlert


class TradeService:
    async def open_from_tradingview_alert(self, alert: TradingViewAlert) -> CreateOrderResult:
        payload = {
            "symbol": alert.symbol,
            "productType": alert.product_type,
            "marginMode": alert.margin_mode,
            "marginCoin": alert.margin_coin,
            "side": alert.side,
            "orderType": alert.order_type,
            "size": alert.size,
        }

        if alert.order_type == "limit":
            if not alert.price:
                raise ValueError("price is required for limit orders")
            payload["price"] = alert.price

        response = await bitget_client.place_order(payload)
        order_data = response.get("data", {})
        return CreateOrderResult(
            exchange_order_id=order_data.get("orderId", ""),
            status=response.get("msg", "unknown"),
            raw_response=response,
        )


trade_service = TradeService()
