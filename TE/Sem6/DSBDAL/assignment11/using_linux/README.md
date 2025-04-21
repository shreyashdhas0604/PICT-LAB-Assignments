## Hadoop Word Count Assignment on Local Linux Standalone Setup

### ✅ Requirements
Before implementation, ensure you have the following:

#### 🔧 Software & Tools:
1. **Ubuntu OS** (preferably 18.04 LTS or compatible)
2. **Java JDK** (version 8 or higher)
3. **Hadoop** (3.x series like 3.3.5 recommended)
4. **SSH enabled** (for `ssh localhost` to work)
5. **HDFS running in local/standalone mode**
6. **An input text file** (`input.txt`) with some words in it (for word count)
7. **A directory for compiling and storing `.class` files and `.jar`**
8. **Basic knowledge of terminal, Java, and HDFS commands**

---

### 🛠️ Steps for Implementation

#### 1. Install Java and Hadoop
```bash
sudo apt update
sudo apt install openjdk-8-jdk -y
```

#### 2. Download and Set Up Hadoop
```bash
wget https://downloads.apache.org/hadoop/common/hadoop-3.3.5/hadoop-3.3.5.tar.gz
sudo tar -xvzf hadoop-3.3.5.tar.gz -C /usr/local/
sudo mv /usr/local/hadoop-3.3.5 /usr/local/hadoop
```

Set environment variables in `~/.bashrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export HADOOP_HOME=/usr/local/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
```
Then:
```bash
source ~/.bashrc
```

Edit Hadoop config files for standalone mode:
- `core-site.xml`
- `hdfs-site.xml`
- `mapred-site.xml`
- `yarn-site.xml`

#### 3. Start Hadoop Services
```bash
start-all.sh
```

#### 4. Check Hadoop Daemons
```bash
jps
```
Expected output should include:
- NameNode
- DataNode
- ResourceManager
- NodeManager

#### 5. Create HDFS Directory
Replace `<roll no.>` with your actual roll number or unique ID:
```bash
hdfs dfs -mkdir /user/<roll no.>
```

#### 6. Export Hadoop Classpath
```bash
export HADOOP_CLASSPATH=$(hadoop classpath)
echo $HADOOP_CLASSPATH
```

#### 7. Create Input Directory & Upload File
```bash
hdfs dfs -mkdir /user/<roll no.>/input
echo "hello pict hello world pict pict" > input.txt
hdfs dfs -put input.txt /user/<roll no.>/input
```

#### 8. WordCount Java Program
Save this as `WordCount.java`:
```java
import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordCount {

  public static class TokenizerMapper
       extends Mapper<Object, Text, Text, IntWritable>{

    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Context context
                    ) throws IOException, InterruptedException {
      StringTokenizer itr = new StringTokenizer(value.toString());
      while (itr.hasMoreTokens()) {
        word.set(itr.nextToken());
        context.write(word, one);
      }
    }
  }

  public static class IntSumReducer
       extends Reducer<Text,IntWritable,Text,IntWritable> {
    private IntWritable result = new IntWritable();

    public void reduce(Text key, Iterable<IntWritable> values,
                       Context context
                       ) throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
      }
      result.set(sum);
      context.write(key, result);
    }
  }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "word count");
    job.setJarByClass(WordCount.class);
    job.setMapperClass(TokenizerMapper.class);
    job.setCombinerClass(IntSumReducer.class);
    job.setReducerClass(IntSumReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}
```

#### 9. Compile the Java Program
```bash
mkdir -p /home/hadoop/<roll no.>/tut
javac -classpath ${HADOOP_CLASSPATH} -d /home/hadoop/<roll no.>/tut /home/hadoop/<roll no.>/WordCount.java
```

#### 10. Create JAR File
```bash
cd /home/hadoop/<roll no.>/
jar -cvf stutorial.jar -C tut/ .
```

#### 11. Run WordCount Job
```bash
hadoop jar /home/hadoop/<roll no.>/stutorial.jar WordCount /user/<roll no.>/input /user/<roll no.>/output
```

#### 12. View Output
```bash
hdfs dfs -cat /user/<roll no.>/output/*
```
Expected output:
```
hello   2
pict    3
world   1
```

---

### 📌 Summary
You’ll need:
- Java installed
- Hadoop configured locally
- HDFS setup and input uploaded
- WordCount Java logic compiled and packaged into a `.jar`
- Job submitted using `hadoop jar`

Let me know if you want to generate a sample `input.txt` or turn this into a downloadable script!

