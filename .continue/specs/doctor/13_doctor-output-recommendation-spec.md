# Doctor Output Recommendation Spec

## Overview

Add a short recommendation at the end of human-readable doctor output.

## Requirements

- If there are no error diagnostics, the output must recommend `nextworks add blocks`.
- If there are error diagnostics, the output must recommend the highest-priority fixes instead of install.
