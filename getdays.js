/* 
// pollo
function obtenerFechasDisponibles(oficina, year, month) {
    const oficinaData = data.oficinas[oficina];
    if (!oficinaData) {
      return `No se encontró la oficina ${oficina}`;
    }
  
    const agendados = oficinaData.agendados[year];
    if (!agendados || agendados.length === 0) {
      return `No hay agendados para el año ${year}`;
    }
  
    const mesAgendado = agendados[0][month];
    if (!mesAgendado || mesAgendado.length === 0) {
      return `No hay agendados para el mes de ${month}`;
    }
  
    const diasOcupados = new Set();
    mesAgendado.forEach((dia) => {
      Object.keys(dia).forEach((fecha) => {
        diasOcupados.add(parseInt(fecha));
      });
    });
  
    // Obtener los días del mes
    const diasEnMes = new Date(year, new Date(`${year}-${month}-01`).getMonth() + 1, 0).getDate();
  
    const fechasDisponibles = [];
    for (let i = 1; i <= diasEnMes; i++) {
      if (!diasOcupados.has(i)) {
        fechasDisponibles.push(i);
      }
    }
  
    return fechasDisponibles;
  }
    
  
  
  
app.get("/pollo", async (req, res) => {

    // Ejemplo de uso
    const oficina = "cedro-SI-01";
    const year = 2024;
    const month = "octubre";
    const fechasDisponibles = obtenerFechasDisponibles(oficina, year, month);
    console.log(`Fechas disponibles en ${month} ${year} para ${oficina}:`, fechasDisponibles);

    res.status(200).json({
        'Fechas:':  `en ${month} ${year} para ${oficina}: ${fechasDisponibles}`,
        'Resultado:': fechasDisponibles
    })  
});
*/