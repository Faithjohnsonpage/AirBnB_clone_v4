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

  // Call the updateAPIStatus function
  updateApiStatus();

  function fetchPlaces () {
    $.ajax({
	  type: 'POST',
	  url: 'http://localhost:5001/api/v1/places_search/',
	  contentType: 'application/json',
	  data: JSON.stringify({}),
	  dataType: 'json',
	  success: function (data) {
	    renderPlaces(data);
      }
	});
  }

  function renderPlaces (places) {
    let placesSection = $('section.places');
	placesSection.empty(); // Clear existing places

    places.forEach( (place) => {
      let article = $("<article>");

      // Title box
      let titleBox = $('<div>').addClass("title_box");
	  titleBox.append($('<h2></h2>').text(place.name));
	  titleBox.append($('<div></div>').addClass('price_by_night').text('$' + place.price_by_night));
	  article.append(titleBox);

	  // Information
	  let info = $('<div>').addClass('information');
	  info.append($('<div></div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
	  info.append($('<div></div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
	  info.append($('<div></div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
      article.append(info);

	  article.append($("<div>").addClass("description").html(place.description));

	  placesSection.append(article);
	});
  }

  // Call the fetchPlaces function
  fetchPlaces();
});
