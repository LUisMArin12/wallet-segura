from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./wallet.db"
    secret_key: str = "change_this_secret_key"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    payment_identifier_secret: str = "change_this_payment_secret"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
