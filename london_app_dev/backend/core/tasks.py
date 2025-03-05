from celery import shared_task

@shared_task
def hello_task(name: str):
    """
    A Celery task that prints a greeting message.

    Args:
        name (str): The name to be included in the greeting message.

    Returns:
        None
    """
    print(f'Hello {name}. You have {len(name)} characters in your name. ')