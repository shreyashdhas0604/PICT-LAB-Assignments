# 🐳 Hadoop MapReduce on Docker (Windows)

This project demonstrates how to set up a Hadoop cluster using Docker on **Windows** and run a simple **MapReduce WordCount program**.

---

## 🛠 Prerequisites

- **OS**: Windows with WSL enabled (recommended)  
- **Docker Desktop**: Installed and running  
- **Git**: Installed

---

## 📦 Step 1: Clone the Hadoop Docker Setup

```bash
git clone https://github.com/big-data-europe/docker-hadoop.git
cd docker-hadoop
```

> Or if you're using a different repo or structure, navigate to your directory where `docker-compose.yml` exists.

---

## 🚀 Step 2: Start Hadoop Cluster

```bash
docker-compose up -d
```

This sets up and starts the following containers:

- `namenode`
- `datanode`
- `resourcemanager`
- `nodemanager`
- `historyserver`

---

## 📤 Step 3: Copy WordCount.java to Namenode Container

Make sure `WordCount.java` is in your working directory (on Windows):

```bash
docker cp D:\Academics\Sem6\dsbda\assignment11\WordCount.java namenode:/root/
```

---

## 🐧 Step 4: Access the Namenode Container

```bash
docker exec -it namenode bash
```

Inside the container:

```bash
cd /root
```

---

## 🧾 Step 5: Compile and Package WordCount.java

```bash
javac -classpath $(hadoop classpath) -d . WordCount.java
jar -cvf wordcount.jar *.class
```

---

## 📂 Step 6: Prepare HDFS Input

```bash
hdfs dfs -mkdir -p /input
echo "Hadoop is awesome. Hadoop is fast." > sample.txt
hdfs dfs -put sample.txt /input
```

---

## 🏃‍♂️ Step 7: Run WordCount MapReduce Job

```bash
hadoop jar wordcount.jar WordCount /input /output
```

---

## 📖 Step 8: View the Output

```bash
hdfs dfs -cat /output/part-r-00000
```

Example output:
```
Hadoop	2
awesome.	1
fast.	1
is	2
```

---

## 🧹 Optional: Clean Up

```bash
docker-compose down
```

---

## 📄 WordCount.java (Sample Code)

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

  public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable> {
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
      StringTokenizer itr = new StringTokenizer(value.toString());
      while (itr.hasMoreTokens()) {
        word.set(itr.nextToken());
        context.write(word, one);
      }
    }
  }

  public static class IntSumReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
    public void reduce(Text key, Iterable<IntWritable> values, Context context)
        throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
      }
      context.write(key, new IntWritable(sum));
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

---

## 📌 Notes

- If you run into `deprecated image` warnings, it's safe to ignore unless the container fails to run.
- The `namenode` container is where you perform all file and job operations.
