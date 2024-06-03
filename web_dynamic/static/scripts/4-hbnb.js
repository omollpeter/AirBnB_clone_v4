window.addEventListener('load', function () {
  // task 3
  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // task 2
  const amenityIds = {};
  $('input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenityIds[$(this).attr('data-id')];
    }
    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  });

  // task 4
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function (data) {
    for (const place of data) {
      const template = `<article>

        <div class="title_box">

          <h2>${place.name}</h2>

          <div class="price_by_night">

        $${place.price_by_night}

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
            ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
            ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
            ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>

      </article> <!-- End 1 PLACE Article -->`;
      $('section.places').append(template);
    }
  });

    $(".filters button").click(function() {
        const amnty_ids = Object.create({});
        amnty_ids.amenities = Object.keys(amenityIds);
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: 'application/json',
            data: JSON.stringify(amnty_ids)
        }).done(function(data) {
          for (const place of data) {
            const template = `<article>
      
              <div class="title_box">
      
                <h2>${place.name}</h2>
      
                <div class="price_by_night">
      
              $${place.price_by_night}
      
                </div>
              </div>
              <div class="information">
                <div class="max_guest">
                  ${place.max_guest} Guests
                </div>
                <div class="number_rooms">
                  ${place.number_rooms} Bedrooms
                </div>
                <div class="number_bathrooms">
                  ${place.number_bathrooms} Bathroom
                </div>
              </div>
              <div class="description">
                ${place.description}
              </div>
      
            </article> <!-- End 1 PLACE Article -->`;
            $('section.places').append(template);
          }
        })
    });
});
