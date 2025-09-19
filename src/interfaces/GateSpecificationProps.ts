export interface GateSpecificationProps {
  gateName: string; // Identifier for the gate, e.g., "1", "2", etc.
  gateData: {
    gateName?: string; // Name of the gate
    supervisor?: number; // Number of supervisors
    scanner?: number; // Number of scanners
    softCheck?: number; // Number of soft checkers
    technicalSupport?: number; // Number of technical support
    cashier?: number; // Number of cashiers
    logistics?: number; // Number of logistics
    host?: number; // Number of hosts
    projectManager?: number; // Number of project managers
    operationSupervisor?: number; // Number of operation supervisors
    gameOperator?: number; // Number of game operators
    [key: string]: any; // Index signature to allow dynamic keys
  };
  onGateDataChange: (newGateData: {
    gateName?: string;
    supervisor?: number;
    scanner?: number;
    softCheck?: number;
    technicalSupport?: number;
    cashier?: number;
    logistics?: number;
    host?: number;
    projectManager?: number;
    operationSupervisor?: number;
    gameOperator?: number;
    [key: string]: any; // Index signature to allow dynamic keys
  }) => void;
}
