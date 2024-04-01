#!/usr/bin/env python3

from subprocess import run
import json
import base64
from typing import Any

URL = "localhost:3000/products"


def image_to_base64(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
        return encoded_string


def base64_to_image(encoded_str: str, image_path):
    image = base64.b64decode(encoded_str)
    with open(image_path, "wb") as image_file:
        image_file.write(image)


soap_b64 = image_to_base64("soap.jpeg")
shampo_b64 = image_to_base64("shampo.jpeg")


def post(dic: dict[str, Any]):
    js = json.dumps(dic)
    result = run(
        [
            "curl",
            "--header",
            "Content-Type: application/json",
            "--request",
            "POST",
            "--data",
            js,
            URL,
        ],
        capture_output=True,
    )
    print(result.stdout)


def put(id: str, dic: dict[str, Any]):
    js = json.dumps(dic)
    result = run(
        [
            "curl",
            "--header",
            "Content-Type: application/json",
            "--request",
            "PUT",
            "--data",
            js,
            URL + "/" + id,
        ],
        capture_output=True,
    )
    print(result.stdout)


def get_all():
    result = run(["curl", "--request", "GET", URL], capture_output=True)
    print(result.stdout)


def get_one(id: str):
    result = run(["curl", "--request", "GET", URL + "/" + id], capture_output=True)
    print(result.stdout)


def delete(id: str):
    result = run(["curl", "--request", "DELETE", URL + "/" + id], capture_output=True)
    print(result.stdout)


shampo: dict[str, Any] = {}
shampo["name"] = "shampo"
shampo["price"] = "200"
shampo["quantity"] = "10"
shampo["image"] = shampo_b64

soap: dict[str, Any] = {}
soap["name"] = "soap"
soap["price"] = "125"
soap["quantity"] = "30"
soap["image"] = soap_b64

# post(shampo)
# get_all()
# get_one("6609ff8fef53e4d75e8c5d26")
# put("6609ff8fef53e4d75e8c5d26", soap)
# delete("6609ff5fef53e4d75e8c5d24")
