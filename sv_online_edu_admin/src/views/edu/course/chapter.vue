<template>
  <div class="app-container">
    <h2 style="text-align: center;">Release new course</h2>
    <el-steps :active="2"
              process-status="wait"
              align-center
              style="margin-bottom: 40px;">
      <el-step title="Fill in this course infomation" />
      <el-step title="Create course outline (chapters and sections)" />
      <el-step title="Release new course" />
    </el-steps>

    <el-button type="text"
               @click="openChapterDialog()">Add chapter</el-button>

    <!-- Chapter -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList"
          :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">Add section</el-button>
            <el-button style=""
                       type="text"
                       @click="openEditChapter(chapter.id)">Modify</el-button>
            <el-button type="text"
                       @click="removeChapter(chapter.id)">Delete</el-button>
          </span>
        </p>
        <!-- Section (Video) -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children"
              :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">Modify</el-button>
                <el-button type="text">Delete</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">Previous</el-button>
      <el-button :disabled="saveBtnDisabled"
                 type="primary"
                 @click="next">Save and next</el-button>
    </div>

    <!-- Chapter
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList"
          :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button style=""
                       type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>
        <!-- 视频
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children"
              :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">Previous</el-button>
        <el-button :disabled="saveBtnDisabled"
                   type="primary"
                   @click="next">Save and next</el-button>
      </el-form-item>
    </el-form>
    -->

    <!-- Add and modify chapter dialog -->
    <el-dialog :visible.sync="dialogChapterFormVisible"
               title="Add chapter">
      <el-form :model="chapter"
               label-width="120px">
        <el-form-item label="Chapter title">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="Chapter sort">
          <el-input-number v-model="chapter.sort"
                           :min="0"
                           controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="saveOrUpdate">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId: '', // course id
      chapterVideoList: [],
      chapter: { // Chapter data
        title: '',
        sort: 0
      },
      dialogChapterFormVisible: false // Show dialog chapter
    }
  },
  created() {
    // Get course id from route address
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {
    // Delete chapter
    removeChapter(chapterId) {
      this.$confirm('This will permanently delete this chapter record. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // call delete chapter method
        chapter.deleteChapter(chapterId)
          .then(response => { // success to delete chapter by id
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            // Refresh
            this.getChapterVideo()
          })
        // notice message
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    // Modify chapter
    openEditChapter(chapterId) {
      this.dialogChapterFormVisible = true
      chapter.getChapter(chapterId)
        .then(response => {
          this.chapter = response.data.chapter
        })
    },
    // Add chapter dialog
    openChapterDialog() {
      this.dialogChapterFormVisible = true
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    // Add chapter
    addChapter() {
      // Set course id into chapter
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter)
        .then(response => {
          // Close dialog
          this.dialogChapterFormVisible = false
          // Notice
          this.$message({
            type: 'success',
            message: 'Success to add this chapter!'
          })
          // Refresh
          this.getChapterVideo()
        })
    },
    // Modify chapter
    updateChapter() {
      chapter.updateChapter(this.chapter)
        .then(response => {
          // Close dialog
          this.chapter.id = ''
          this.dialogChapterFormVisible = false
          // Notice
          this.$message({
            type: 'success',
            message: 'Success to modify this chapter!'
          })
          // Refresh
          this.getChapterVideo()
        })
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
    },
    // Get all course chapters list include all videos list by course id
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId)
        .then(response => {
          this.chapterVideoList = response.data.allChapterVideo
        })
    },
    previous() {
      // Go to previous step
      this.$router.push({ path: '/course/courseinfo/' + this.courseId })
    },
    next() {
      // Go to next step
      this.$router.push({ path: '/course/publish/' + this.courseId })
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  /*float: left;*/
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
