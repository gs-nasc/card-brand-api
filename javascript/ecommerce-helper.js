var eCommerceHelper = {
    card: {
        bins: {
            "mastercard": /^(5[0-9]|2[2-7])/,
            "visa": /^4/,
            "amex": /^3[47][0-9]/,
            "diners": /^3(?:0[0-5]|[68]\d)\d/,
            "hipercard": /^(606282)|(3841)/,
            "discover": /^6([045]|22)/,
            "jcb": /^35/,
            "aura": /^50[0-9]/,
            "elo": /(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/
        },
        getBrand: function (number) {
            for (var [key, value] of Object.entries(this.bins)) {
                if (number.match(value) != null) {
                    return key;
                }
            }

            return "card invalid or brand not found";
        },
        getParts: function(value, minParts = 0, maxParts= 12, minValue = 0, tax = 0) {
            var parts = [];
            if(value > minParts) {
                for (let index = 1; index <= maxParts; index++) {
                    if(value/index>=minValue) {
                        parts.push = value/index * (1 + (tax / 100));
                    }
                }
            }
            return parts;
        },
        
    },
    person: {
        cpfIsValid: function (cpf) {
            var Soma;
            var Resto;
            Soma = 0;
            if (cpf == "00000000000") return false;

            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(cpf.substring(9, 10))) return false;

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(cpf.substring(10, 11))) return false;
            return true;
        },
        getIpData: function () {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var obj = JSON.parse(this.response);

                    var ip = [];
                    ip.ip = obj.geoplugin_request;
                    ip.city = obj.geoplugin_city;
                    ip.region = obj.geoplugin_region;
                    ip.region_code = obj.geoplugin_regionCode;
                    ip.country = obj.geoplugin_countryName;
                    ip.country_code = obj.geoplugin_countryCode;

                    return ip;
                }
            });

            xhr.open("GET", "https://www.geoplugin.net/json.gp");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send();
        }
    },
    company: {
        cpnjIsValid: function (cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj == '') return false;

            if (cnpj.length != 14)
                return false;

            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999")
                return false;

            // Valida DVs
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;

            return true;
        }
    }
};
