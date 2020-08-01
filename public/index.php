<?php
define('URL_SERVER', 'http://local.dev.ar');
define('URL_API', URL_SERVER . '/decampo/api/');
?>
<!DOCTYPE html>
<head>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="js/js.js"></script>
</head>
<html>
<body>

<div class="panel panel-default">
    <div class="panel-heading h3">Productos</div>

    <div id="mensaje" role="alert" hidden></div>

    <table class="table">
        <tr class="tr_row" data-id="">
            <td id="td_nombre" scope="row">
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">Nombre</span>
                    <input type="text" class="form-control" value="">
                </div>
            </td>
            <td class="td_precio_pesos">
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">$</span>
                    <input type="text" class="form-control" value="">
                </div>
            </td>
            <td class="td_precio_dollar">
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">USD</span>
                    <input type="text" class="form-control" value="" disabled>
                </div>
            </td>
            <td class="td_boton">
                <button id='alta' type="button" class="btn btn-primary">ALTA</button>
            </td>
        </tr>
    </table>
</div>

<input id="productos" type="hidden"
       data-url="<?php echo URL_API ?>productos"
</body>

</html>
