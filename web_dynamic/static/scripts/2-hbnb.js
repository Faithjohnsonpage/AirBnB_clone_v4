$(document).ready(function () {
  const selectedAmenities = {};

  // Listen for changes on input checkboxes within elements with class 'amenity-checkbox'
  $('input.amenity-checkbox').change(function () {
    // This function is called whenever a checkbox is checked or unchecked

    // Retrieve the Amenity ID and name from data attributes
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      // If the checkbox is checked, add the amenity ID and name to the dictionary
      selectedAmenities[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the amenity ID from the dictionary
      delete selectedAmenities[amenityId];
    }

    // Update the 'h4' tag inside the div 'Amenities' with the list of selected amenities
    const text = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(text);
  });

  // Function to update API status
  function updateApiStatus () {
    $.get('http://localhost:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  // Call the function initially
  updateApiStatus();
});
