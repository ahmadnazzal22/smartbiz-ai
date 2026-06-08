import re

def strip_html(text: str | None) -> str:
    if not text:
        return ""
    text = re.sub(r"<[^>]*>", "", text)
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = text.replace("\"", "&quot;").replace("'", "&#x27;")
    return text.strip()


def sanitize_email(email: str) -> str:
    email = email.strip().lower()
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        raise ValueError("Invalid email format")
    if len(email) > 254:
        raise ValueError("Email too long")
    return email
