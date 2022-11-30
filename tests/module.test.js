const {findallcontacts,generateCode,getconnection,accounts}=require('../modulesfortesting');

test('findallcontacts',()=>{
  findallcontacts((records)=>{expect(records.length>0).toB(true)})
})

test('findallaccounts',()=>{
  accounts((records)=>{expect(records.length>0).toB(true)})
})


test('checkconnection', async ()=>{
  expect(getconnection()).not.toBe(0)
})


test('generate code',()=>{
  expect(generateCode()).not.toBe(0)
  })