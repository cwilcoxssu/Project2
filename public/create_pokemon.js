$(document).ready(function () {
    $('#createPokemonBtn').click( function(event){
        event.preventDefault();
        var payload = {
            PokeID: $('#PokeID').val(),
            Name: $('#Name').val(),
            Level: $('#Level').val(),
            Primary_type: $('#Primary_type').val(),
            Secondary_type: $('#Secondary_type').val(),
            Weakness: $('#Weakness').val()
        };

        $.ajax({
            url: $("#create_user_form").attr("action"),
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
