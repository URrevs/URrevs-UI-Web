export default interface APIUpdate {
  numPhones: number;
  numCompanies: number;
  phones: [_id: string, name: string, type: string];
  companies: [_id: string, name: string, type: string];
  date: any;
  isUpdating: boolean;
  failed: boolean;
  automatic: boolean;
}
