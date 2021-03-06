$fun = $args[0];

Write-Host $args


if($fun -eq '-d'){
    DeleteTask($args[1]);
} elseif($fun -eq '-a'){
    NewTask($args[1], $args[2]);
} elseif ($fun -eq '-start') {
    StartTask($args[1])
} elseif ($fun -eq '-stop') {
    StopTask($args[1])
} elseif($fun -eq '-h'){
    help
}
else {
    Write-Host 'You did it wrong, try calling task -h'
}


function show($name){
    Get-ScheduledJob $name
    Write-Host 'could not find ' $name 
}
function NewTask($name, $path){
    Write-Host  
    $o= New-ScheduledJobOption -ContinueIfGoingOnBattery -MultipleInstancePolicy queue ;
    $t= New-JobTrigger -Once -At $(Get-Date) -RepetitionInterval ( New-TimeSpan -Minute 30 ) -RepetitionDuration ([TimeSpan]::MaxValue) ;
    $j= Register-ScheduledJob -name Out-String -InputObject $name -FilePath Out-String -InputObject $path -Trigger $t -ScheduledJobOption $o
}

function StopTask($name){
    Disable-ScheduledJob $name
}

function StartTask($name){
    Enable-ScheduledJob $name
}

function DeleteTask($name){
    Unregister-ScheduledJob $name
}

function help(){
    Write-Host 'To add a new task, -a nameOfTask pathToFile';
    Write-Host 'To delete a task, -d nameOfTask';
    Write-Host 'To enable a task, -start nameOfTask';
    Write-Host 'To disable a task, -stop nameOfTask';
    Write-Host 'Currently default time interval is set to once every 2 minutes';
}