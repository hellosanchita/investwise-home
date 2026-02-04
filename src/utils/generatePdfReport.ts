import jsPDF from "jspdf";
import { PropertyData, ComparisonInsight } from "./mockPropertyData";

export function generatePdfReport(
  properties: PropertyData[],
  insights: ComparisonInsight[],
  customerName: string
): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Property Comparison Report", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Prepared for: ${customerName}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 6;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 15;

  // Key Insights Section
  doc.setTextColor(0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Key Insights", 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  insights.forEach((insight) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    const icon = insight.type === "best" ? "★" : insight.type === "warning" ? "⚠" : "ℹ";
    doc.setFont("helvetica", "bold");
    doc.text(`${icon} ${insight.title}`, 14, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    
    const descLines = doc.splitTextToSize(insight.description, pageWidth - 28);
    doc.text(descLines, 14, yPos);
    yPos += descLines.length * 5 + 5;
  });

  yPos += 10;

  // Property Comparison Table
  doc.addPage();
  yPos = 20;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Property Details", 14, yPos);
  yPos += 10;

  properties.forEach((property, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Property header
    doc.setFillColor(240, 240, 240);
    doc.rect(14, yPos - 5, pageWidth - 28, 8, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`Property ${index + 1}: ${property.address}`, 16, yPos);
    yPos += 10;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const details = [
      [`Price: $${property.price.toLocaleString()}`, `Price/Sq Ft: $${property.pricePerSqft}`],
      [`Bedrooms: ${property.bedrooms}`, `Bathrooms: ${property.bathrooms}`],
      [`Square Feet: ${property.sqft.toLocaleString()}`, `Lot Size: ${property.lotSize.toLocaleString()} sq ft`],
      [`Year Built: ${property.yearBuilt}`, `Property Type: ${property.propertyType}`],
      [`HOA Fees: $${property.hoaFees}/mo`, `Est. Monthly Tax: $${property.monthlyTax}`],
      [`Est. Insurance: $${property.monthlyInsurance}/mo`, `Est. Rent: $${property.estimatedRent}/mo`],
      [`Days on Market: ${property.daysOnMarket}`, `Source: ${property.source.charAt(0).toUpperCase() + property.source.slice(1)}`],
    ];

    details.forEach((row) => {
      doc.text(row[0], 16, yPos);
      doc.text(row[1], pageWidth / 2, yPos);
      yPos += 5;
    });

    // Calculate monthly cost and rent yield
    const totalMonthlyCost = property.hoaFees + property.monthlyTax + property.monthlyInsurance;
    const rentYield = ((property.estimatedRent * 12) / property.price * 100).toFixed(2);

    doc.setFont("helvetica", "bold");
    yPos += 2;
    doc.text(`Total Monthly Costs (excl. mortgage): $${totalMonthlyCost}`, 16, yPos);
    yPos += 5;
    doc.text(`Annual Rent Yield: ${rentYield}%`, 16, yPos);
    yPos += 15;
  });

  // Summary Table
  if (properties.length > 1) {
    doc.addPage();
    yPos = 20;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Side-by-Side Comparison", 14, yPos);
    yPos += 12;

    doc.setFontSize(9);

    // Table headers
    const colWidth = (pageWidth - 50) / properties.length;
    doc.setFont("helvetica", "bold");
    doc.text("Metric", 14, yPos);
    properties.forEach((p, i) => {
      const shortAddr = p.address.split(",")[0].substring(0, 15);
      doc.text(shortAddr, 50 + i * colWidth, yPos);
    });
    yPos += 8;

    // Draw line
    doc.setDrawColor(200);
    doc.line(14, yPos - 3, pageWidth - 14, yPos - 3);

    doc.setFont("helvetica", "normal");

    const metrics = [
      { label: "Price", getValue: (p: PropertyData) => `$${(p.price / 1000).toFixed(0)}K` },
      { label: "Beds/Baths", getValue: (p: PropertyData) => `${p.bedrooms}/${p.bathrooms}` },
      { label: "Sq Ft", getValue: (p: PropertyData) => p.sqft.toLocaleString() },
      { label: "$/Sq Ft", getValue: (p: PropertyData) => `$${p.pricePerSqft}` },
      { label: "Year Built", getValue: (p: PropertyData) => p.yearBuilt.toString() },
      { label: "HOA/mo", getValue: (p: PropertyData) => `$${p.hoaFees}` },
      { label: "Est. Rent", getValue: (p: PropertyData) => `$${p.estimatedRent}` },
      { label: "Rent Yield", getValue: (p: PropertyData) => `${((p.estimatedRent * 12) / p.price * 100).toFixed(1)}%` },
      { label: "Days Listed", getValue: (p: PropertyData) => p.daysOnMarket.toString() },
    ];

    metrics.forEach((metric) => {
      doc.text(metric.label, 14, yPos);
      properties.forEach((p, i) => {
        doc.text(metric.getValue(p), 50 + i * colWidth, yPos);
      });
      yPos += 6;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128);
  const footerText = "This report is for informational purposes only. Data is estimated and should be verified independently.";
  doc.text(footerText, pageWidth / 2, 285, { align: "center" });

  return doc;
}
