use strict;
use warnings;

my $userchoice = 0;
my $i;
my @students = (); #empty array
my %information = ();

while($userchoice!=4){
print "------------------------------\n";
print "Welcome! What would you like to do?\n";
print "[0]Create Student Record\n";
print "[1]Edit Student Record\n";
print "[2]View Student Record\n";
print "[3]Delete Student Record\n";
print "[4]Exit\n";
print "Your Choice : ";
$userchoice = <STDIN>;
chomp($userchoice);

if($userchoice == 0) {
    print "-----------\n";
    print "CREATE STUDENT RECORD.\n";
    if($#students <= 9){
        print "Name : ";
        $information{"name"} = <STDIN>;
        chomp($information{"name"});
        push @students,\%information;
    }
    print "Student Record Full. " if ($#students >= 10);
}

if($userchoice == 2){
    print "\nVIEW STUDENTS.\n";
    print "[0]View One Student\n";
    print "[1]View All Students\n";
    print "[2]Back to Main Menu\n";
    print "Your Choice : ";
    $userchoice = <STDIN>;
    if($userchoice == 1){
        print "VIEW ALL STUDENTS.\n";

            print "STUDENT 1---------------\n";
            print "Name : ", $students[0]->{"name"}, " \n";
            print "STUDENT 2---------------\n";
            print "Name : ", $students[1]->{"name"}, " \n";
    }
  }
}