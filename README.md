# Statamic Changelog Reader

A GitHub action to read and parse data from the `CHANGELOG.md` file.

## Usage

The main reason to use this package is to generate the contents of a release using the corresponding version in the markdown file.

You can do this with the [@actions/create-release](https://www.github.com/actions/create-release) action:

```yaml
on:
  push:
    tags:
    - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

name: Create Release

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:

      - name: Checkout code
        uses: actions/checkout@v1
    
    - name: Get Changelog
        id: changelog
        uses: statamic/changelog-action@v1
        with:
          version: ${{ github.ref }}
    
    - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.changelog.outputs.version }}
          release_name: ${{ steps.changelog.outputs.version }}
          body: ${{ steps.changelog.outputs.text }}
```

If there is no changelog entry found for the specified version, a blank one will be provided.

## Changelog Format

This action assumes you are using a `CHANGELOG.md` in the project root formatted like [statamic/cms](https://github.com/statamic/cms/blob/3.1/CHANGELOG.md).

- Each release begins with an h2.
- Each h2 contains the version (with or without a `v` prefix), and a date in YYYY-MM-DD in brackets:
  ```md
  ## 1.2.3 (2020-04-16)
  ```
  ```md
  ## v1.2.3 (2020-04-16)
  ```
- Any h3s inside the body of each release will be convered to h2s.
  ```md
  ### What's new
  - This

  ### What's fixed
  - That
  ```
- The h1 at the start of the file and any intro text will be ignored.
