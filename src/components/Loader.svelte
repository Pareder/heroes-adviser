<div class="loader"></div>

<style>
    .loader{
        position: relative;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        border-radius: 50%;
    }

    .loader::before,
    .loader::after{
        content: "";
        position: absolute;
        top: -5px;
        left: -5px;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: 5px solid transparent;
        border-top-color: #ffffff;
    }

    .loader::before{
        z-index: 1;
        animation: spin 1s infinite;
    }

    .loader::after{
        border: 5px solid #000000;
    }

    @keyframes spin{
        0%{
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100%{
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>