$(document).ready(function () {

    const formularioElement = $("#formulario");
    const inputElement = $("#superInput");
   

    console.log(formularioElement);
    
    

    formularioElement.submit(function (event) {
        event.preventDefault();
        
        const superHeroId = inputElement.val();

        if(superHeroId <=0 || superHeroId >= 732) {
            $("#errorMsg").html("<p class='inputIdError'>Error: Debes ingresar un número entre 1 y 731</p>");
        } else {
            $("#errorMsg").html("<p class='inputIdError'></p>");
        }

        //Implementación API Superheros

        $.ajax ({
            type: "GET",
            url: `https://superheroapi.com/api.php/973305306790168/${superHeroId}`,
            dataType: "json",
        })        // Función .done que distribuye cada data en su lugar
            .done (function (data) {
                console.log(data);
                
                const options = {
                    title: {
                        text: "SuperHero PowerStats",
                    },
                    data: [
                        {
                        type: "pie" ,
                        showInLegend: true,
                        toolTipContent: "{name}: <strong>{y}%</strong>",
		                indexLabel: "{name} - {y}%",
                        dataPoints: [
                           {y: `${data.powerstats.combat}`, name:"Combat"},
                           {y: `${data.powerstats.durability}`, name:"Durability"},
                           {y: `${data.powerstats.intelligence}`, name:"Intelligence"},
                           {y: `${data.powerstats.power}`, name:"Power"},
                           {y: `${data.powerstats.speed}`, name:"Speed"},
                           {y: `${data.powerstats.strength}`, name:"Strength"},
                        ],
                        },
                        ],
                };

                

                $("#chartContainer").CanvasJSChart(options);

                $("#superCardImg").attr("src", data.image.url);
                $("#heroName").html(data.name);
                $("#heroConections").html(`<p class="boldText">Conections: <br> </p> ${data.connections['group-affiliation']}`);
                $("#heroPublisher").html(`<p class="boldText">Publisher: </p> ${data.biography.publisher}`);
                $("#heroOccupation").html(`<p class="boldText">Occupation: </p> ${data.work.occupation}`);
                $("#heroFirstAppearance").html(`<p class="boldText">First Appearance: </p> ${data.biography['first-appearance']}`);
                $("#heroHeight").html(`<p class="boldText">Height: </p> ${data.appearance.height.join("    -    ")}`);
                $("#heroWeight").html(`<p class="boldText">Weight: </p> ${data.appearance.weight.join("    -    ")}`);
                $("#heroAliases").html(`<p class="boldText">Aliases: </p> ${data.biography.aliases.join(" / ")}`);

            
            })
            .fail( function() {

             console.log ("error");
              
              });
            
    })

 
      




});