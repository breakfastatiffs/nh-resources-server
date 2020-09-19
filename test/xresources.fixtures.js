function makeResourcesArray() {
    return [
      {
        id: 1,
        category: 'Veterans',
        title: 'Veterans Count',
        phone_number: 6036213570,
        url: 'https://vetscount.org/',
        street: '555 Auburn St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/VeteransCount',
        twitter: 'https://twitter.com/VeteransCount',
        instagram: 'https://www.instagram.com/veteranscount/',
      },
      {
        id: 2,
        category: 'Residence Challenged',
        title: 'Families in Transition',
        phone_number: 6036419441,
        url: 'https://www.fitnh.org/',
        street: '122 Market St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/fitnh/',
        twitter: 'https://twitter.com/FITNH',
        instagram: '',
      },
      {
        id: 3,
        category: 'Mental Health',
        title: 'The Mental Health Center of Greater Manchester',
        phone_number: 6036884111,
        url: 'https://www.mhcgm.org/',
        street: '401 Cypress St',
        city: 'Manchester',
        county: 'Hillsborough',
        zip_code: 03103,
        state: 'NH',
        facebook: 'https://www.facebook.com/MentalHealthCenterNH/',
        twitter: 'https://twitter.com/MentalHealthNH',
        instagram: 'https://www.instagram.com/mhcgm/',
      },
    ]
  }
  
  function makeMaliciousResource() {
    const maliciousResource = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      category: 'Veterans',
      phone_number: `6032226666`,
    }
    const expectedResource = {
      ...maliciousResource,
      title: 'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
      category: 'Animal Services',
      phone_number: `6032226666`,
    }
    return {
      maliciousResource,
      expectedResource,
    }
  }
  
  module.exports = {
    makeResourcesArray,
    makeMaliciousResource,
  }