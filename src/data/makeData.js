import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const role = ['Admin', 'Central Admin', 'Teacher', 'Student', 'Parent'];

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const newPerson = () => {
  return {
    Id: Math.floor(Math.random() * 100),
    FirstName: namor.generate({ words: 1, saltLength: 0 }),
    LastName: namor.generate({ words: 1, saltLength: 0 }),
    Email: namor.generate({ words: 1, saltLength: 0 }) + '@email.com',
    PhoneNumber: '0559335776',
    Center: {
      Name: namor.generate({ words: 4, saltLength: 0 }),
    },
    Address: namor.generate({ words: 4, saltLength: 0 }),
    DateOfBirth: randomDate(new Date(1988, 0, 1), new Date(2012, 11, 31)),
    Gender: Math.random() >= 0.5,
    UserName: namor.generate({ words: 1, saltLength: 0 }),
    Role: {
      Name: role[Math.floor(Math.random() * role.length)]
    }
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}