import hashlib
import hmac
import re

from app.core.config import settings


def normalize_identifier(identifier: str) -> str:
    """Elimina espacios y separadores comunes antes de calcular hash/máscara."""
    return re.sub(r"[\s\-]", "", identifier.strip())


def mask_identifier(identifier: str) -> str:
    normalized = normalize_identifier(identifier)
    last_four = normalized[-4:]
    return f"**** **** **** {last_four}"


def create_identifier_hash(identifier: str) -> str:
    normalized = normalize_identifier(identifier)
    return hmac.new(
        settings.payment_identifier_secret.encode("utf-8"),
        normalized.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
