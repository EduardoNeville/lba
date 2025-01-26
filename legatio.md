# PROMPT 8cc21528-6831-4728-8e9e-3e0f5a5673dc

Fix this bash script to properly loop through the image names, check if they are being used if not move them to not_used directory.

# OUTPUT 8cc21528-6831-4728-8e9e-3e0f5a5673dc

Here is the corrected version of the bash script:

```bash
#!/bin/bash

# List of image filenames
declare -a imgs=("las-brisas-landscape.jpg" "modern-house.jpeg" "catedral-malaga-crop.jpeg" "puerto-banus-la-concha.jpeg" "ronda-cliff.jpeg" "palmera-house.jpeg" "casa-la-concha.jpg" "hand-pen.jpg" "puente-romano-peer.jpeg" "bugambilla-terace.jpg" "golf-sand-bunker-pink-trees-crop.jpg" "yesi.jpeg" "pool-house.jpg" "golf-fondo-la-concha.jpg" "golf-lake-villa-padierna.jpg" "marbella-old-town-flowers.jpg" "plaza-los-naranjos.jpg" "concierto-iglesia.jpeg" "plaza-rural.jpeg" "concierto-catedral.jpeg" "concierto-piano-viola.jpeg" "cuardo-puerto.jpeg" "flamenco.jpeg" "concierto-final.jpeg" "bariles.jpeg" "museo-arte.jpeg" "marisela.jpeg" "joseluis.jpeg")

# Destination directory for unused images
destination_dir="public/not_used"

# Ensure the destination directory exists
mkdir -p "${destination_dir}"

# Loop through each image
for img in "${imgs[@]}"; do
    # Search for image usage
    out=$(rg "${img}" public)

    # If not found, move to 'not_used' directory
    if [[ -z "${out}" ]]; then
        echo "${img} not used"
        mv "public/images/${img}" "${destination_dir}/${img}"
    fi
done
```

### Explanation of Fixes:

1. **Quotes around Variables**: Quotes around variables like `"${img}"` and `"${out}"` ensure that the script handles filenames with spaces or special characters correctly.
2. **Proper Command Structure**:
   - The `[[ -z "${out}" ]]` checks if the search output is empty (indicating the image is not used).
3. **Path Adjustment**: Moved the unused image to a directory using the correct path `"public/not_used/${img}"`.
4. **Create `not_used` Directory if Absent**:
   - Added `mkdir -p "${destination_dir}"` to ensure the destination folder exists before moving files.
5. **Friendly Output**: Prints the image name when it is not being used.

### Prerequisites:

- The script assumes that the `rg` (ripgrep) tool is installed and configured.
- The `public/images` directory contains the image files listed in `imgs`.

To run the script, save it to a `.sh` file, make it executable (`chmod +x script.sh`), and run it in your terminal.

# ASK MODEL BELLOW
