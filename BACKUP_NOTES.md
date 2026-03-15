# Backup notes (страховочное сохранение)

Текущие наработки сохранены в Git.

## Snapshot
- Backup base commit: `e4322fc`
- Branch: `work`

## Быстрый возврат к текущему состоянию
```bash
git checkout work
git reset --hard e4322fc
```

## Локальный архив проекта (опционально)
```bash
mkdir -p backups

git archive --format=tar.gz -o backups/bot-backup-e4322fc.tar.gz e4322fc
```

## Что уже зафиксировано
- Backend FastAPI (TradingView webhook, Telegram webhook, mini app endpoint)
- Bitget API интеграция c подписью
- Статический mini app UI
- Конфигурация `.env.example` и README
