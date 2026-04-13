import base64
import hashlib
import hmac
import json
import time

import httpx

from app.config import settings


class BitgetClient:
    def __init__(self) -> None:
        self.base_url = settings.bitget_base_url.rstrip("/")
        self.api_key = settings.bitget_api_key
        self.api_secret = settings.bitget_api_secret
        self.passphrase = settings.bitget_passphrase

    def _timestamp_ms(self) -> str:
        return str(int(time.time() * 1000))

    def _sign(self, timestamp: str, method: str, request_path: str, body: str = "") -> str:
        payload = f"{timestamp}{method.upper()}{request_path}{body}"
        digest = hmac.new(
            self.api_secret.encode("utf-8"),
            payload.encode("utf-8"),
            hashlib.sha256,
        ).digest()
        return base64.b64encode(digest).decode("utf-8")

    def _headers(self, timestamp: str, signature: str) -> dict:
        return {
            "ACCESS-KEY": self.api_key,
            "ACCESS-SIGN": signature,
            "ACCESS-TIMESTAMP": timestamp,
            "ACCESS-PASSPHRASE": self.passphrase,
            "Content-Type": "application/json",
            "locale": "en-US",
        }

    async def place_order(self, payload: dict) -> dict:
        request_path = "/api/v2/mix/order/place-order"
        body = json.dumps(payload, separators=(",", ":"))
        timestamp = self._timestamp_ms()
        signature = self._sign(timestamp, "POST", request_path, body)

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                f"{self.base_url}{request_path}",
                content=body,
                headers=self._headers(timestamp, signature),
            )

        response.raise_for_status()
        data = response.json()

        if data.get("code") != "00000":
            raise RuntimeError(f"Bitget returned error: {data}")

        return data


bitget_client = BitgetClient()
