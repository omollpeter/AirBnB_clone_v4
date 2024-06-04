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
  $('.amenities .popover ul li input[type=checkbox]').click(function () {
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
    $('section.places').html("");
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

    let stateIds = {};
    $('.locations .popover ul li h2 input[type=checkbox]').click(function () {
      if ($(this).prop('checked')) {
        stateIds[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete stateIds[$(this).attr('data-id')];
      }
    });

    let cityIds = {};
    $('.locations .popover ul li ul li input[type=checkbox]').click(function () {
      if ($(this).prop('checked')) {
        cityIds[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete cityIds[$(this).attr('data-id')];
      }
    });

    // Task 5 and 6
    $(".filters button").click(function() {
        let objs = Object.create({});
        if (stateIds) {
          objs.states = Object.keys(stateIds);
        }

        if (cityIds) {
          objs.cities = Object.keys(cityIds);
        }

        if (amenityIds) {
          objs.amenities = Object.keys(amenityIds);
        }
        console.log(objs)
        
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: 'application/json',
            data: JSON.stringify(objs)
        }).done(function(data) {
          $('section.places').html("");
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
