$(function() {
   let checkedAmenities = [];

   $(".popover ul li input[type='checkbox']").change(function() {
        let amnty_obj = Object.create({})
        const amnty_id = $(this).attr("data-id");
        const amnty_name = $(this).attr("data-name");

        amnty_obj.name = amnty_name;
        amnty_obj.id = amnty_id;
        if (this.checked) {
            checkedAmenities.push(amnty_obj);
        } else {
            checkedAmenities = checkedAmenities.filter(item => item.id !== amnty_id);
        }

        if (!checkedAmenities.length) {
            $(".amenities h4").html("&nbsp;");
        } else {
            let i = 1;
            $(".amenities h4").text("");
            $.each(checkedAmenities, function(index, value) {
                $(".amenities h4").append(value.name);
                if (i < checkedAmenities.length) {
                    $(".amenities h4").append(", ");
                    i++;
                }
            });
        }
   });

   $.get("http://0.0.0.0:5001/api/v1/status", function(data, textStatus) {
        if (data.status === "OK") {
            $("div#api_status").addClass("available");
        }
   });
});
