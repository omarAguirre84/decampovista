$(document).ready(function () {
    let url = $('#productos').attr('data-url');
    let table = $(".table");
    let tr = $(".tr_row");

    hide_msg();
    listar();

    function listar() {
        $.ajax({
            url: url,
            type: 'get',
        }).done(function (data) {
            let prods = $.parseJSON(data).data;
            $.each(prods, function (key, value) {
                let tr_new = tr.clone();
                let td_nombre = tr_new.find('#td_nombre');
                let td_precio_pesos = tr_new.find(".td_precio_pesos");
                let td_precio_dollar = tr_new.find(".td_precio_dollar");
                let td_boton = tr_new.find(".td_boton");

                tr_new.attr('data-id',value.id);

                td_nombre.find('input').val(value.nombre);
                td_precio_pesos.find('input').val(value.precio_pesos);
                td_precio_dollar.find('input').val(value.precio_dollar);

                td_boton.find("button").addClass('guardar');
                td_boton.find("button").html('GUARDAR');

                td_boton.append(get_boton_baja());
                $(".table tbody:first-child").append(tr_new);
            });
        }).fail(function (data) {
            display_msg(false,
                data.error?data.error:'Error al listar');
        });
    }

    $(table).delegate( "#baja", "click", function() {
        let row = $(this).parent().parent();
        let id = row.attr('data-id');
        let datos = {'id': id};
        $.ajax({
            data: datos,
            url: url,
            type: 'delete',
        }).done(function (data) {
            row.remove();
            display_msg(true,'Eliminado');
        }).fail(function (data) {
            display_msg(false,
                data.error?data.error:'Error al eliminar');
        });
    });

    $(table).delegate( ".guardar", "click", function() {
        let row = $(this).parent().parent();
        let id = row.attr('data-id');
        let nombre = row.find("#td_nombre").find("input").val();
        let precio_pesos = row.find(".td_precio_pesos").find("input").val();
        let datos = {'id': id,'nombre':nombre,'precio_pesos':precio_pesos};
        modificar(datos);
    });
    
    function modificar(_datos) {
        $.ajax({
            data: _datos,
            url: url,
            type: 'patch',
        }).done(function (data) {
            display_msg(true,false);
        }).fail(function (data) {
            display_msg(false,
                data.error?data.error:'Error al modificar');
        });
    }

    $("#alta").click( function alta() {
        let row = $(this).parent().parent();
        let nombre = row.find("#td_nombre").find("input").val();
        let precio_pesos = row.find(".td_precio_pesos").find("input").val();

        if(nombre !== '' && precio_pesos !== ''){
            let datos = {'nombre':nombre,'precio_pesos':precio_pesos};
            $.ajax({
                data: datos,
                url: url,
                type: 'post',
            }).done(function (data) {
                let dato = JSON.parse(data).data;
                if(dato !== null){
                    let tr_new = tr.clone();
                    let td_boton = tr_new.find(".td_boton");
                    let td_nombre = tr.find('#td_nombre');
                    let td_precio_pesos = tr.find(".td_precio_pesos");

                    tr_new.attr('data-id',data);
                    td_boton.find("button").addClass('guardar');
                    td_boton.find("button").html('GUARDAR');

                    $(".table tbody:first-child").append(tr_new);

                    tr_new.find(".td_precio_dollar").find('input').val(dato.precio_dollar);

                    td_nombre.find('input').val('');
                    td_precio_pesos.find('input').val('');

                    td_boton.find("button").removeClass('guardar');
                    td_boton.find("button").html('GUARDAR');
                    td_boton.append(get_boton_baja());
                    display_msg(true,'Alta OK');
                } else {
                    display_msg(false,'No se dio alta');
                }

            });
        }else{
            display_msg(false,'datos incompletos')
        }
    });

    function hide_msg() {
        let msg = $("#mensaje");
        msg.attr('hidden',true);
    }

    function display_msg(evento, mensaje) {
        let msg = $("#mensaje");
        let verde = "alert alert-success";
        let rojo = "alert alert-danger";
        if(evento){
            msg.removeClass();
            msg.addClass(verde);
            msg.html(mensaje?mensaje:"Guardado OK");
            msg.show();
        }else{
            msg.removeClass();
            msg.addClass(rojo);
            msg.html(mensaje?mensaje:"Error");
            msg.show();
        }
    }
});

function get_boton_baja() {
    return "<button id='baja' type='button' class='btn btn-danger'>BAJA</button>";
}