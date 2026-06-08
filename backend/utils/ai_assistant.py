from .anthropic_client import generate_response, generate_daily_report, clear_conversation

__all__ = ["get_ai_response", "generate_daily_report", "clear_conversation"]


def get_ai_response(message: str, conversation_history: list = None) -> str:
    conv_id = None
    if conversation_history and len(conversation_history) > 0:
        last = conversation_history[-1]
        conv_id = last.get("conversation_id") if isinstance(last, dict) else None

    return generate_response(message, conversation_id=conv_id)
