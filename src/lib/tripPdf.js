import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const PAGE = {
  left: 14,
  right: 14,
  top: 26,
  bottom: 16,
}

const toTitle = (value) =>
  String(value)
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase())

const normalizeItineraryDays = (itinerary) => {
  if (!itinerary) return []

  if (Array.isArray(itinerary)) {
    return itinerary.map((day, index) => ({
      day: day?.day || index + 1,
      theme: day?.theme || `Day ${index + 1}`,
      bestTimeToVisit: day?.bestTimeToVisit || 'Flexible',
      activities: Array.isArray(day?.activities) ? day.activities : [],
    }))
  }

  return Object.entries(itinerary)
    .map(([key, data], index) => {
      const parsedDay = Number(String(key).replace(/[^0-9]/g, ''))
      return {
        day: Number.isFinite(parsedDay) && parsedDay > 0 ? parsedDay : index + 1,
        theme: data?.theme || `Day ${index + 1}`,
        bestTimeToVisit: data?.bestTimeToVisit || 'Flexible',
        activities: Array.isArray(data?.activities) ? data.activities : [],
      }
    })
    .sort((a, b) => a.day - b.day)
}

const drawPageDecor = (doc, destination, createdAt) => {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(245, 101, 81)
  doc.setFontSize(13)
  doc.text('AtlasPrime', PAGE.left, 10)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.setFontSize(8)
  doc.text(`Created: ${createdAt}`, pageWidth - PAGE.right, 10, { align: 'right' })
  doc.text(`${destination}`, pageWidth - PAGE.right, 14, { align: 'right' })

  doc.setDrawColor(226, 232, 240)
  doc.line(PAGE.left, 16, pageWidth - PAGE.right, 16)

  const pageNumber = doc.getNumberOfPages()
  doc.setTextColor(148, 163, 184)
  doc.setFontSize(8)
  doc.text(`Page ${pageNumber}`, pageWidth - PAGE.right, pageHeight - 6, { align: 'right' })
}

const ensureSpace = (doc, y, requiredHeight, destination, createdAt) => {
  const pageHeight = doc.internal.pageSize.getHeight()
  if (y + requiredHeight <= pageHeight - PAGE.bottom) return y

  doc.addPage()
  drawPageDecor(doc, destination, createdAt)
  return PAGE.top
}

const sectionTitle = (doc, y, title, destination, createdAt) => {
  const nextY = ensureSpace(doc, y, 10, destination, createdAt)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.setFontSize(12)
  doc.text(title, PAGE.left, nextY)
  return nextY + 4
}

const addTable = (doc, { y, head, body, destination, createdAt, columnStyles = {} }) => {
  autoTable(doc, {
    startY: y,
    margin: { left: PAGE.left, right: PAGE.right, top: PAGE.top, bottom: PAGE.bottom },
    head,
    body,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [11, 17, 32],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    columnStyles,
    didDrawPage: () => {
      drawPageDecor(doc, destination, createdAt)
    },
  })

  return (doc.lastAutoTable?.finalY || y) + 6
}

export const generateTripPdf = (trip) => {
  if (!trip) throw new Error('Trip data is missing.')

  const sel = trip?.userSelection || {}
  const td = trip?.tripData || {}

  const destination = sel?.location?.label || td?.destination || 'Destination not provided'
  const createdAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  drawPageDecor(doc, destination, createdAt)

  let y = PAGE.top

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.setFontSize(18)
  doc.text('Detailed Trip Itinerary', PAGE.left, y)
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(71, 85, 105)
  const subtitle = doc.splitTextToSize(
    `${destination} | ${sel?.departureDate || 'Departure N/A'} to ${sel?.returnDate || 'Return N/A'}`,
    180
  )
  doc.text(subtitle, PAGE.left, y)
  y += subtitle.length * 5 + 2

  y = sectionTitle(doc, y, 'Trip Overview', destination, createdAt)

  const overviewRows = [
    ['Destination', destination],
    ['Source', sel?.sourceLocation?.label || 'Not provided'],
    ['Total Days', String(sel?.noOfDays || td?.totalDays || 'Not provided')],
    ['Budget', sel?.budget || 'Not provided'],
    ['Travelers', sel?.traveler || 'Not provided'],
    ['Traveler Type', sel?.travelerType || 'Not provided'],
    ['Travel Mode', sel?.travelMode || td?.travelMode || 'Not provided'],
    ['Interests', Array.isArray(sel?.travelInterests) && sel.travelInterests.length ? sel.travelInterests.join(', ') : 'Not provided'],
    ['Package', td?.packageTitle || 'Not provided'],
    ['Generated On', createdAt],
  ]

  y = addTable(doc, {
    y,
    head: [['Field', 'Details']],
    body: overviewRows,
    destination,
    createdAt,
    columnStyles: {
      0: { cellWidth: 45, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
    },
  })

  if (Array.isArray(td?.tripHighlights) && td.tripHighlights.length) {
    y = sectionTitle(doc, y, 'Trip Highlights', destination, createdAt)
    y = addTable(doc, {
      y,
      head: [['#', 'Highlight']],
      body: td.tripHighlights.map((item, index) => [String(index + 1), item]),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 'auto' },
      },
    })
  }

  const itineraryDays = normalizeItineraryDays(td?.itinerary)
  if (itineraryDays.length) {
    y = sectionTitle(doc, y, 'Daily Itinerary', destination, createdAt)

    itineraryDays.forEach((dayInfo) => {
      y = ensureSpace(doc, y, 16, destination, createdAt)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(15, 23, 42)
      doc.text(`Day ${dayInfo.day}: ${dayInfo.theme}`, PAGE.left, y)
      y += 5

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(71, 85, 105)
      doc.text(`Best Time: ${dayInfo.bestTimeToVisit || 'Flexible'}`, PAGE.left, y)
      y += 2

      const dayRows = (dayInfo.activities || []).map((activity) => [
        toTitle(activity?.timeOfDay || 'time'),
        activity?.placeName || 'Not provided',
        activity?.placeDetails || 'Not provided',
        activity?.ticketPricing || 'N/A',
        activity?.travelTime || 'N/A',
        activity?.rating ? String(activity.rating) : 'N/A',
      ])

      y = addTable(doc, {
        y: y + 2,
        head: [['Time', 'Place', 'Details', 'Cost', 'Travel', 'Rating']],
        body: dayRows.length ? dayRows : [['N/A', 'No activities available', '-', '-', '-', '-']],
        destination,
        createdAt,
        columnStyles: {
          0: { cellWidth: 18 },
          1: { cellWidth: 36 },
          2: { cellWidth: 72 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 14, halign: 'center' },
        },
      })
    })
  }

  if (Array.isArray(td?.hotels) && td.hotels.length) {
    y = sectionTitle(doc, y, 'Hotel Recommendations', destination, createdAt)
    y = addTable(doc, {
      y,
      head: [['Hotel', 'Address', 'Price', 'Rating', 'Description']],
      body: td.hotels.map((hotel) => [
        hotel?.hotelName || 'N/A',
        hotel?.hotelAddress || 'N/A',
        hotel?.price || 'N/A',
        hotel?.rating ? String(hotel.rating) : 'N/A',
        hotel?.description || 'N/A',
      ]),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 36 },
        1: { cellWidth: 42 },
        2: { cellWidth: 20 },
        3: { cellWidth: 12, halign: 'center' },
        4: { cellWidth: 'auto' },
      },
    })
  }

  if (Array.isArray(td?.hostels) && td.hostels.length) {
    y = sectionTitle(doc, y, 'Hostel Recommendations', destination, createdAt)
    y = addTable(doc, {
      y,
      head: [['Hostel', 'Address', 'Price', 'Rating', 'Description']],
      body: td.hostels.map((hostel) => [
        hostel?.hostelName || 'N/A',
        hostel?.hostelAddress || 'N/A',
        hostel?.price || 'N/A',
        hostel?.rating ? String(hostel.rating) : 'N/A',
        hostel?.description || 'N/A',
      ]),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 36 },
        1: { cellWidth: 42 },
        2: { cellWidth: 20 },
        3: { cellWidth: 12, halign: 'center' },
        4: { cellWidth: 'auto' },
      },
    })
  }

  if (Array.isArray(td?.transportOptions) && td.transportOptions.length) {
    y = sectionTitle(doc, y, 'Transport Options', destination, createdAt)
    y = addTable(doc, {
      y,
      head: [['Option', 'No.', 'Departure', 'Arrival', 'Duration', 'Price']],
      body: td.transportOptions.map((option) => [
        option?.name || option?.airline || option?.trainName || option?.busName || 'N/A',
        option?.number || option?.trainNumber || option?.flightNumber || option?.busNumber || 'N/A',
        option?.departureTime || 'N/A',
        option?.arrivalTime || 'N/A',
        option?.duration || 'N/A',
        option?.price || 'N/A',
      ]),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 46 },
        1: { cellWidth: 24 },
        2: { cellWidth: 24 },
        3: { cellWidth: 24 },
        4: { cellWidth: 24 },
        5: { cellWidth: 'auto' },
      },
    })
  }

  if (td?.costBreakdown && Object.keys(td.costBreakdown).length) {
    y = sectionTitle(doc, y, 'Cost Breakdown', destination, createdAt)
    y = addTable(doc, {
      y,
      head: [['Category', 'Amount']],
      body: Object.entries(td.costBreakdown).map(([key, value]) => [toTitle(key), String(value)]),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold' },
        1: { cellWidth: 'auto' },
      },
    })
  }

  if (Array.isArray(td?.localExperiences) && td.localExperiences.length) {
    y = sectionTitle(doc, y, 'Local Experiences', destination, createdAt)
    y = addTable(doc, {
      y,
      head: [['Experience', 'Category', 'Estimated Cost', 'Description']],
      body: td.localExperiences.map((exp) => [
        exp?.title || 'N/A',
        exp?.category || 'N/A',
        exp?.estimatedCost || 'N/A',
        exp?.description || 'N/A',
      ]),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 'auto' },
      },
    })
  }

  if (Array.isArray(td?.travelHacks) && td.travelHacks.length) {
    y = sectionTitle(doc, y, 'Travel Hacks', destination, createdAt)
    addTable(doc, {
      y,
      head: [['Hack', 'Description']],
      body: td.travelHacks.map((hack) => [hack?.title || 'N/A', hack?.description || 'N/A']),
      destination,
      createdAt,
      columnStyles: {
        0: { cellWidth: 52, fontStyle: 'bold' },
        1: { cellWidth: 'auto' },
      },
    })
  }

  const shortDestination = String(destination)
    .split(',')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  doc.save(`atlasprime-${shortDestination || 'trip'}-itinerary.pdf`)
}
