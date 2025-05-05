// API Service para consumir datos del backend
import axios from 'axios';

// URL base de la API del backend
const API_URL = 'http://localhost:3000/api';

// URL base de la API de MariaDB
const MARIADB_API_URL = 'http://localhost:3003/api/mariadb';

// Interfaz para los datos del Transelevador
export interface TranselevadorData {
  id: string;
  name: string;
  status: string;
  position_x: number;
  position_y: number;
  position_z: number;
  last_activity: string;
  cycles_today: number;
  efficiency: number;
}

// Interfaz para las alarmas
export interface Alarma {
  id: string;
  titulo: string;
  descripcion: string;
  timestamp: string;
  tipo: 'error' | 'warning' | 'info' | 'success';
}

// Interfaz para los datos de TLV1_Status de MariaDB
export interface TLV1StatusData {
  id: number;
  modo: number;
  ocupacion: number;
  averia: number;
  matricula: number;
  pasillo_actual: number;
  x_actual: number;
  y_actual: number;
  z_actual: number;
  timestamp: string;
  estadoFinOrden: number;
  resultadoFinOrden: number;
}

// Servicio para obtener datos del Transelevador 1
export const getTranselevadorData = async (id: string): Promise<TranselevadorData> => {
  try {
    const response = await axios.get(`${API_URL}/transelevadores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del transelevador:', error);
    
    // Datos de ejemplo en caso de error (para desarrollo)
    return {
      id: 'TRANS-001',
      name: 'Transelevador T1',
      status: 'active',
      position_x: 7,
      position_y: 5,
      position_z: 1,
      last_activity: new Date().toISOString(),
      cycles_today: 127,
      efficiency: 98.5
    };
  }
};

// Servicio para obtener alarmas del Transelevador 1
export const getTranselevadorAlarmas = async (id: string): Promise<Alarma[]> => {
  try {
    const response = await axios.get(`${API_URL}/transelevadores/${id}/alarmas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener alarmas del transelevador:', error);
    
    // Datos de ejemplo en caso de error (para desarrollo)
    return [
      {
        id: 'alm-001',
        titulo: 'Error de posicionamiento',
        descripcion: 'El transelevador T1 ha reportado un error en el posicionamiento vertical.',
        timestamp: new Date().toISOString(),
        tipo: 'error'
      },
      {
        id: 'alm-002',
        titulo: 'Mantenimiento preventivo',
        descripcion: 'Se requiere mantenimiento preventivo del sistema hidráulico.',
        timestamp: new Date(Date.now() - 1200000).toISOString(), // 20 minutos antes
        tipo: 'warning'
      },
      {
        id: 'alm-003',
        titulo: 'Ciclo completado',
        descripcion: 'El transelevador T1 ha completado el ciclo de almacenamiento #4532.',
        timestamp: new Date(Date.now() - 2400000).toISOString(), // 40 minutos antes
        tipo: 'success'
      }
    ];
  }
};

// Servicio para obtener datos del TLV1 desde MariaDB
export const getTLV1StatusFromMariaDB = async (): Promise<TLV1StatusData> => {
  try {
    const response = await axios.get(`${MARIADB_API_URL}/tlv1`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de TLV1 desde MariaDB:', error);
    
    // Datos de ejemplo en caso de error (para desarrollo)
    return {
      id: 1,
      modo: 1,
      ocupacion: 0,
      averia: 0,
      matricula: 1001,
      pasillo_actual: 1,
      x_actual: 10,
      y_actual: 5,
      z_actual: 3,
      timestamp: new Date().toISOString(),
      estadoFinOrden: 0,
      resultadoFinOrden: 0
    };
  }
};

// Servicio para obtener el historial de estados del TLV1 desde MariaDB
export const getTLV1HistoryFromMariaDB = async (limit: number = 10): Promise<TLV1StatusData[]> => {
  try {
    const response = await axios.get(`${MARIADB_API_URL}/tlv1/historial?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de TLV1 desde MariaDB:', error);
    
    // Datos de ejemplo en caso de error (para desarrollo)
    return [
      {
        id: 1,
        modo: 1,
        ocupacion: 0,
        averia: 0,
        matricula: 1001,
        pasillo_actual: 1,
        x_actual: 10,
        y_actual: 5,
        z_actual: 3,
        timestamp: new Date().toISOString(),
        estadoFinOrden: 0,
        resultadoFinOrden: 0
      }
    ];
  }
};
