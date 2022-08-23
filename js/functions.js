let botonFile = document.getElementById('file')

let boton1 = document.getElementById("boton1")
let boton2 = document.getElementById("boton2")
let boton3 = document.getElementById("boton3")
let memo   = document.getElementById('id_memo')
let textoLeido = ""
let objetoLeido = {}

//Seleccion y carga del archivo en localStorage
botonFile.addEventListener("change", (event)=>{
    // let file = this.files[0]
    let file = event.currentTarget.files[0]
    if (file == null) return
    let reader = new FileReader
    reader.onload = async function(){
        textoLeido = reader.result
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: subirAMemoria,
            args:[textoLeido]
        });
    }
    reader.readAsText(file);
  })

function subirAMemoria(texto){
    localStorage.setItem('Materia',texto)
    console.log('Materia cargada en localStoroge')
}

//Seccion para jalar los datos del localStorage y ponerlos en el Tag textArea
boton1.addEventListener("click", async (event)=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: funcion1
        },
        (injectionResults) => {
            if (injectionResults){
                memo.value = JSON.stringify(injectionResults[0].result)
            }
        }
    )
})

function funcion1(){
    let materiaTxt = localStorage.getItem('Materia')
    let materiaObj = JSON.parse(materiaTxt)
    return materiaObj
}

//Seccion para jalar los datos del localStorage y ponerlos en la pagina web
boton2.addEventListener("click", async ()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: llenarForma,
    });
})

function llenarForma() {
    let materiaTxt = localStorage.getItem('Materia')
    let materiaObj = JSON.parse(materiaTxt)
    document.getElementById('inputMateria').value = materiaObj.nombre
    document.getElementById('inputPlan').value = materiaObj.plan
    document.getElementById('inputClave').value = materiaObj.clave
    document.getElementById('inputUnidad1').value = materiaObj.unidad[0].titulo
}

//Seccion para limpiar el localStorage
boton3.addEventListener("click", async ()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: limpiarLocalStorage,
    });
})

function limpiarLocalStorage(){
    localStorage.removeItem("Materia")
    console.log('localStorage limpio')
}