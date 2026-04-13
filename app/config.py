from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    app_name: str = "tg-bitget-trading-bot"
    app_env: str = Field(default="dev")
    app_host: str = Field(default="0.0.0.0")
    app_port: int = Field(default=8000)

    telegram_bot_token: str = Field(default="")
    telegram_webhook_secret: str = Field(default="")
    telegram_miniapp_url: str = Field(default="")

    tradingview_passphrase: str = Field(default="")

    bitget_base_url: str = Field(default="https://api.bitget.com")
    bitget_api_key: str = Field(default="")
    bitget_api_secret: str = Field(default="")
    bitget_passphrase: str = Field(default="")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    def bitget_ready(self) -> bool:
        return all([
            self.bitget_api_key,
            self.bitget_api_secret,
            self.bitget_passphrase,
        ])

    def telegram_ready(self) -> bool:
        return bool(self.telegram_bot_token)


settings = Settings()
