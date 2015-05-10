$(document).ready(function () {
    $('#PokeID').change( function(event){
        
        event.preventDefault();

        if($('#PokeID').val() == "") {
            // the user selected the blank option, so hide the div and return
            $('#output').hide();
            return;
        }

        var payload = {
            PokeID: $('#PokeID').val()
        };

        console.log(payload);

        $.ajax({
            url: $("#ajax_form_example").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});
