from pathlib import Path

fixtures_path = Path("./fixtures")

for fixture_path in fixtures_path.glob("*"):
    if fixture_path.is_dir():
        encoding = fixture_path.name
        input_path = fixture_path / "input.txt"
        output = input_path.read_text(encoding="utf-8").encode(
            encoding, errors="replace"
        )
        output_path = fixture_path / "output.bin"
        output_path.write_bytes(output)
