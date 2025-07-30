from django.db import models

class StudentItem(models.Model):
    stdid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    dob = models.DateField(null=True, blank=True)
    contactnum = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    parentname = models.CharField(max_length=100)
    parentnum = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    admissiondate = models.DateField(null=True, blank=True)
    floornum = models.IntegerField(null=True, blank=True)
    roomnum = models.IntegerField()

    def __str__(self):
        return f"{self.stdid} - {self.name})"
    

class HostelFeeItem(models.Model):
    feeid = models.AutoField(primary_key=True)  
    std_id = models.ForeignKey(StudentItem, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paymentdate = models.DateField()           
    duedate = models.DateField()              
    status = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return f"Fee ID: {self.feeid}, Student: {self.std.name}, Fee: ₹{self.amount}"


class HostelItem(models.Model):
    hostelid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    totalflr = models.IntegerField()
    totalrooms = models.IntegerField()
    totalstaff = models.IntegerField()
    hostelcontact = models.CharField(max_length=20, null=True, blank=True)    
    def __str__(self):
        return f"{self.name or 'Unnamed Hostel'} (ID: {self.hostelid})"


class Room(models.Model):
    # hostelid = models.IntegerField(null=True, blank=True) 
    CHOOSE_FLR = [(i, f"Floor-{i}") for i in range(1,11)]
    ROOM_TYPE = [
        ('single', 'Single'),
        ('double', 'Double'),
        ('triple', 'Triple'),
        ('ac', 'AC'),
        ('non-ac', 'Non-AC'),
    ]
    floornum = models.IntegerField(choices=CHOOSE_FLR)
    roomtype = models.CharField(max_length=20, choices=ROOM_TYPE)
    roomnum = models.PositiveIntegerField(unique=True)
    capacity = models.PositiveIntegerField()
    currentoccupy = models.PositiveIntegerField()

    def __str__(self):
        return f"Room {self.roomnum} (Floor {self.floornum}) - {self.roomtype}"
    
    
class VisitorItem(models.Model):
    visitorid = models.AutoField(primary_key=True)
    std = models.ForeignKey(StudentItem, on_delete=models.CASCADE)
    visitorname = models.CharField(max_length=100)
    relation = models.CharField(max_length=50)
    visitdate = models.DateTimeField()
    
    def __str__(self):
        return f"{self.visitorname} visiting student {self.std.name}"
    
    
class StaffItem(models.Model):
    staffid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    contactnum = models.BigIntegerField()
    email = models.EmailField()
    salary = models.IntegerField()
    joindate = models.DateField()   
    
    def __str__(self):
        return f"{self.name} role {self.role}"
    
    
class OutPassItem(models.Model):
    outpassid = models.AutoField(primary_key=True)
    std = models.ForeignKey(StudentItem, on_delete=models.CASCADE)
    reason = models.CharField(max_length=50)
    whereto = models.CharField(max_length=50)
    outat = models.DateTimeField()
    innat = models.DateTimeField()
    approvedby = models.ForeignKey(StaffItem, on_delete=models.SET_NULL, null=True)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        approved_name = self.approvedby.name if self.approvedby else "Pending"
        return f"OutPass id{self.outpassid} - {self.std.name} for {self.reason}, approved by {approved_name}"   
    

class StudentLog(models.Model):
    email = models.ForeignKey(StudentItem, on_delete=models.CASCADE)
    password = models.CharField(max_length=128, null=True, blank=True)


class StaffLog(models.Model):
    email = models.ForeignKey(StaffItem, on_delete=models.CASCADE)
    password = models.CharField(max_length=128, null=True, blank=True)
