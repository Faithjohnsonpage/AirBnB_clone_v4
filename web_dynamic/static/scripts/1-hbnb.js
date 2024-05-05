$(document).ready(function() {
    // Initialize an empty object or dictionary to store the amenities
    let selectedAmenities = {};

    // Listen for changes on input checkboxes within elements with class 'amenity-checkbox'
    $('input.amenity-checkbox').change(function() {
        // This function is called whenever a checkbox is checked or unchecked

        // Retrieve the Amenity ID and name from data attributes
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if (this.checked) {
            // If the checkbox is checked, add the amenity ID and name to the dictionary
            selectedAmenities[amenityId] = amenityName;
        } else {
            // If the checkbox is unchecked, remove the amenity ID from the dictionary
            delete selectedAmenities[amenityId];
        }

        // Update the 'h4' tag inside the div 'Amenities' with the list of selected amenities
        let text = Object.values(selectedAmenities).join(', '); // Concatenates the names of the amenities
        $('.amenities h4').text(text);
    });
});

