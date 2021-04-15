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
