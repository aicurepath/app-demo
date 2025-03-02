export interface InsuranceProduct {
  id: string;
  name: string;
  provider: string;
  pricePerYear: number;
  description: string;
  coverageDetails: string[];
  benefits: string[];
  terms: string[];
}

export interface InsuranceCard {
  id: string;
  productId: string;
  productName: string;
  provider: string;
  memberName: string;
  memberNumber: string;
  effectiveDate: Date;
  expirationDate: Date;
  coverageDetails: string[];
}