# Telegram Mini App + Bitget + TradingView (технический каркас)

Техническая заготовка для mini app в Telegram:
- принимает алерты из TradingView;
- открывает сделку на Bitget по API;
- содержит webhook для Telegram-бота;
- содержит стилизованный стартовый экран + dashboard mini app; backend-логика ручного управления пока не подключена.

## Архитектура

1. `POST /webhook/tradingview` — получает alert JSON и создает ордер в Bitget.
2. `POST /webhook/telegram` — принимает апдейты от Telegram и отвечает на `/start`.
3. `GET /miniapp` — полноценный UI mini app (шаблон, без backend-логики управления).
4. `GET /trade/control` — заглушка для будущего модуля управления сделками.
5. `GET /health/config` — проверка, настроены ли обязательные ключи/секреты.

## Быстрый старт

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Формат TradingView alert

Пример JSON для webhook:

```json
{
  "passphrase": "your_tv_secret",
  "symbol": "BTCUSDT",
  "product_type": "USDT-FUTURES",
  "margin_coin": "USDT",
  "margin_mode": "crossed",
  "side": "buy",
  "order_type": "market",
  "size": "0.001"
}
```

Для лимитного ордера добавьте:

```json
{
  "order_type": "limit",
  "price": "62000"
}
```

## Настройка Telegram webhook

Укажите ваш публичный URL и секрет:

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain/webhook/telegram",
    "secret_token": "<TELEGRAM_WEBHOOK_SECRET>"
  }'
```

## Важно

- Перед продом добавьте журналирование, контроль рисков, ограничение размера позиции, и подписи/валидацию источника алертов.
- Проверьте права API ключа Bitget и доступность endpoint для типа рынка, который используете (mix/futures).


## Настройка секретов (безопасно)

Не храните реальные API-ключи в Git. Заполняйте их только в локальном/серверном `.env`.

Пример:

```env
BITGET_API_KEY=...
BITGET_API_SECRET=...
BITGET_PASSPHRASE=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBHOOK_SECRET=...
TRADINGVIEW_PASSPHRASE=...
TELEGRAM_MINIAPP_URL=https://your-domain/miniapp
```

После запуска проверьте готовность конфигурации:

```bash
curl http://127.0.0.1:8000/health/config
```
