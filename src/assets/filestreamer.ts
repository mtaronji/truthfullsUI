
class FileStreamer {
    private file: File;
    private offset: number;
    private chunkSize: number;
    private textDecoder: TextDecoder;
  
    constructor(file: File, encoding: string = 'utf-16le') {
      this.file = file;
      this.offset = 0;
      this.chunkSize = 64 * 1024; // bytes
      this.textDecoder = new TextDecoder(encoding);
      this.rewind();
    }
    public ReadFile(file:File){
      let reader:FileReader = new FileReader();
      let blob = file.slice(this.offset, this.offset + this.chunkSize);
      reader.readAsText(blob);
  
      reader.onload = (e:ProgressEvent<FileReader>) => {     //called after load
        if(e.target?.error == null){
          this.offset += this.chunkSize;
          if(e.target?.result){
            this.ReadChunk(e.target.result as string);
          }
        }
        else{
          console.log(`Read error: ${e.target.error}`);
        }
  
        if (this.offset > file.size){
          console.log("Done Reading file");
          return;
        }
    
        this.ReadFile(file);
         
      }    
    
    }
    rewind(): void {
      this.offset = 0;
    }
  
    isEndOfFile(): boolean {
      return this.offset >= this.getFileSize();
    }
  
    getFileSize(): number {
      return this.file.size;
    }

    ReadChunk (CurrentChunk:string){
      
    }
  }