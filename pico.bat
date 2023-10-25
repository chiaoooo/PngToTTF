@echo off
setlocal enabledelayedexpansion

set "input_folder=111598002_svg"
set "output_folder=pico"

mkdir %output_folder%

for %%f in (%input_folder%\*.svg) do (
    set "input_file=%%~nxf"
    set "output_file=%output_folder%\!input_file!"
    picosvg %input_folder%\!input_file! > !output_file!
)

endlocal
