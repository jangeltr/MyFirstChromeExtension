document.getElementById('openfile').onchange = function(){
    let file = this.files[0];
    if (file == null) return;
    let reader = new FileReader;
    reader.onload = function(){    
        localStorage.setItem('Materia',reader.result)
        alert('Datos cargados')
    }
    reader.readAsText(file);
}