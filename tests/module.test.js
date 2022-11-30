const {findallcontacts}=require('../controller/main');

test('findallcontacts',()=>{
  findallcontacts((records)=>{expect(records.length>0).toB(true)})
})