import os

input_folder = "./svg_separate"
output_folder = "./output"
# mkdir %output_folder%
f = []
for filenames in os.listdir(input_folder):
    print(f"picosvg {input_folder}/{filenames} > {output_folder}/{filenames}")
    os.popen(f"picosvg {input_folder}/{filenames} > {output_folder}/{filenames}")