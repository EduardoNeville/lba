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
    out=$(rg "${img}")
    # If not found, move to 'not_used' directory
    if [[ -z "${out}" ]]; then
        echo "${img} not used"
        echo "${out}"
    fi
done
